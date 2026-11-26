
import prisma from "../config/prisma.js";
import { ArtworkStatus } from "../../generated/prisma/index.js";
import type { ArtworkCategory } from "../../generated/prisma/index.js";

export async function createArtwork(data: {
  title: string;
  description?: string;
  imageUrl: string;
  category: ArtworkCategory;
  creatorId: string;
}) {
  return prisma.artwork.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      imageUrl: data.imageUrl,
      category: data.category,
      creatorId: data.creatorId,
    },
  });
}

export async function getPendingArtworks() {
  return prisma.artwork.findMany({
    where: {
      status: ArtworkStatus.PENDING,
    },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}


export async function approveArtwork(
  artworkId: string,
  adminId: string
) {
  const result = await prisma.artwork.updateMany({
    where: {
      id: artworkId,
      status: ArtworkStatus.PENDING,
    },
    data: {
      status: ArtworkStatus.APPROVED,
      reviewedById: adminId,
      reviewedAt: new Date(),
      moderationReason: null,
    },
  });

  return result.count;
}

export async function rejectArtwork(
  artworkId: string,
  adminId: string,
  reason: string
) {
  const result = await prisma.artwork.updateMany({
    where: {
      id: artworkId,
      status: ArtworkStatus.PENDING,
    },
    data: {
      status: ArtworkStatus.REJECTED,
      reviewedById: adminId,
      reviewedAt: new Date(),
      moderationReason: reason,
    },
  });

  return result.count;
}