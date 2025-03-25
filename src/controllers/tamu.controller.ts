import { NextFunction, Response } from "express";
import { responses } from "../constants";
import { AuthRequest } from "../middleware/auth";
import TamuService from "../services/tamu.service";
import { TamuFilters } from "../types/tamu";
import { PaginationParams } from "../types/pagination";

class TamuController {
  private tamuService: TamuService;

  constructor(tamuService: TamuService) {
    this.tamuService = tamuService;
  }

  async getAllTamus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const pagination: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
      };

      const filters: TamuFilters = {
        search: req.query.search as string,
        startDate: req.query.startDate
          ? new Date(req.query.startDate as string)
          : undefined,
        endDate: req.query.endDate
          ? new Date(req.query.endDate as string)
          : undefined,
        status_hadir: req.query.status_hadir
          ? req.query.status_hadir === "true"
          : req.query.status_hadir
          ? req.query.status_hadir === "false"
          : undefined,
      };

      const result = await this.tamuService.getAllTamus(
        req?.user.id,
        pagination,
        filters
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(200).json({
        success: true,
        message: responses.successGetTamus,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTamuById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.tamuService.getTamuById(
        Number(req.params.id),
        req.user.id
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(200).json({
        success: true,
        message: responses.successGetTamus,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createTamu(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.tamuService.createTamu({
        name: req.body.name,
        no_hp: req.body.no_hp,
        status_hadir: req.body.status_hadir,
        email: req.user.email,
      });

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(201).json({
        success: true,
        message: responses.successCreateTamu,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTamu(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.tamuService.updateTamu(
        req.user.id,
        Number(req.params.id),
        req.body
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(200).json({
        success: true,
        message: responses.successUpdateTamu,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async softDeleteTamu(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.tamuService.softDeleteTamu(
        Number(req.params.id),
        req.user.id
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(204).json({
        success: true,
        message: responses.successDeleteTamu,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default TamuController;
