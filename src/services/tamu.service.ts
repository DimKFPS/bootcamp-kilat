import TamuRepository from "../repositories/tamu.repository";
import Tamu from "../models/tamu.model";
import { CreateTamuDto, UpdateTamuDto, TamuFilters } from "../types/tamu";
import { PaginationParams, PaginatedResult } from "../types/pagination";

class TamuService {
  private tamuRepository: TamuRepository;

  constructor(tamuRepository: TamuRepository) {
    this.tamuRepository = tamuRepository;
  }

  async getAllTamus(
    userId: number,
    pagination?: PaginationParams,
    filters?: TamuFilters
  ): Promise<PaginatedResult<Tamu> | string> {
    const data = await this.tamuRepository.findAll(userId, pagination, filters);

    if (typeof data === "string") {
      return data;
    }

    const { tamus, total } = data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 12;
    const lastPage = Math.ceil(total / limit);

    return {
      data: tamus,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }

  async getTamuById(id: number, userId: number): Promise<Tamu | string> {
    const tamu = await this.tamuRepository.findById(id, userId);
    if (typeof tamu === "string") {
      return tamu;
    }

    if (!tamu) {
      return "Tamu not found";
    }

    return tamu;
  }

  async createTamu(tamuData: CreateTamuDto): Promise<Tamu | string> {
    if (!tamuData.name || !tamuData.email || !tamuData.no_hp) {
      return "Name, email, and no_hp are required";
    }

    const result = await this.tamuRepository.create(tamuData);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }

  async updateTamu(
    userId: number,
    id: number,
    tamuData: UpdateTamuDto
  ): Promise<Tamu | string> {
    const existingTamu = await this.tamuRepository.findById(id, userId);
    if (typeof existingTamu === "string") {
      return existingTamu;
    }

    if (!existingTamu) {
      return "Tamu not found";
    }

    const result = await this.tamuRepository.update(id, tamuData);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }

  async softDeleteTamu(id: number, userId: number): Promise<Tamu | string> {
    const existingTamu = await this.tamuRepository.findById(id, userId);
    if (typeof existingTamu === "string") {
      return existingTamu;
    }

    if (!existingTamu) {
      return "Tamu not found";
    }

    const result = await this.tamuRepository.softDelete(id);
    if (typeof result === "string") {
      return result;
    }
    return result;
  }
}

export default TamuService;
