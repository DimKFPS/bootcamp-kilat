import { type Tamu as PrismaTamu } from "@prisma/client";

class Tamu {
  private id: number;
  private name: string;
  private no_hp: string;
  private status_hadir: boolean = false;
  private createdAt: Date;

  constructor(id: number, name: string, no_hp: string, status_hadir: boolean, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.no_hp = no_hp;
    this.status_hadir = status_hadir;
    this.createdAt = createdAt;
  }

  static fromEntity(prismaTamu: PrismaTamu) {
    return new Tamu(
      prismaTamu.id,
      prismaTamu.name,
      prismaTamu.no_hp,
      prismaTamu.status_hadir,
      prismaTamu.createdAt
    );
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      no_hp: this.no_hp,
      status_hadir: this.status_hadir,
      createdAt: this.createdAt,
    };
  }
}

export default Tamu;
