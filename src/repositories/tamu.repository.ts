import { PrismaClient, Prisma } from "@prisma/client";
import Tamu from "../models/tamu.model";
import { CreateTamuDto, UpdateTamuDto, TamuFilters } from "../types/tamu";
import { PaginationParams } from "../types/pagination";
import { getErrorMessage } from "../utils/error";

class TamuRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(
    userId: number,
    pagination?: PaginationParams,
    filters?: TamuFilters
  ): Promise<{ tamus: Tamu[]; total: number } | string> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.TamuWhereInput = {
        isDeleted: false,
        userId,
        ...(filters?.search && {
          OR: [
            {
              name: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              no_hp: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }),
        ...(filters?.startDate && { createdAt: { gte: filters.startDate } }),
        ...(filters?.endDate && { createdAt: { lte: filters.endDate } }),
        ...(filters?.status_hadir !== undefined
          ? { status_hadir: filters.status_hadir }
          : {}),
      };

      const [tamus, total] = await Promise.all([
        this.prisma.tamu.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.prisma.tamu.count({ where }),
      ]);

      return {
        tamus: tamus.map((tamu) => Tamu.fromEntity(tamu)),
        total,
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async findById(id: number, userId: number): Promise<Tamu | null | string> {
    try {
      const tamu = await this.prisma.tamu.findFirst({
        where: {
          id,
          userId,
          isDeleted: false,
        } as Prisma.TamuWhereInput,
      });
      return tamu ? Tamu.fromEntity(tamu) : null;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async create(tamuData: CreateTamuDto): Promise<Tamu | string> {
    try {
      const tamu = await this.prisma.tamu.create({
        data: {
          name: tamuData.name,
          no_hp: tamuData.no_hp,
          status_hadir: tamuData.status_hadir,
          user: {
            connect: {
              email: tamuData.email,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Prisma.TamuCreateInput,
      });
      return Tamu.fromEntity(tamu);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async update(id: number, tamuData: UpdateTamuDto): Promise<Tamu | string> {
    try {
      const tamu = await this.prisma.tamu.update({
        where: { id } as Prisma.TamuWhereUniqueInput,
        data: {
          ...tamuData,
          updatedAt: new Date(),
        },
      });
      return Tamu.fromEntity(tamu);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async softDelete(id: number): Promise<Tamu | string> {
    try {
      const tamu = await this.prisma.tamu.update({
        where: { id } as Prisma.TamuWhereUniqueInput,
        data: {
          isDeleted: true,
          updatedAt: new Date(),
        } as Prisma.TamuUpdateInput,
      });
      return Tamu.fromEntity(tamu);
    } catch (error) {
      return getErrorMessage(error);
    }
  }
}

export default TamuRepository;
