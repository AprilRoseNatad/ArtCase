
import type { Request, Response } from "express";
import { getPendingArtworks, approveArtwork, rejectArtwork, } from "../services/artwork.service.js";
import { ArtworkCategory } from "../../generated/prisma/index.js";
import { createArtwork } from "../services/artwork.service.js";
import { uploadArtworkImage as uploadToCloudinary } from "../services/cloudinary.service.js";

export async function createArtworkController(req: Request, res: Response) {
  try {
    const { title, description, category } = req.body;
    const creatorId = req.appUser?.id;
    const image = req.file;

    if (!creatorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!image) {
      return res.status(400).json({ message: "Artwork image is required" });
    }

    if (typeof title !== "string" || !title.trim() || title.trim().length > 100) {
      return res.status(400).json({ message: "Title must be between 1 and 100 characters" });
    }

    if (
      description !== undefined &&
      (typeof description !== "string" || description.length > 2000)
    ) {
      return res.status(400).json({ message: "Description cannot exceed 2000 characters" });
    }

    if (
      typeof category !== "string" ||
      !Object.values(ArtworkCategory).includes(category as ArtworkCategory)
    ) {
      return res.status(400).json({ message: "Invalid artwork category" });
    }

    const imageUrl = await uploadToCloudinary(image.buffer);

    const artwork = await createArtwork({
      title: title.trim(),
      description: description?.trim() || undefined,
      imageUrl,
      category: category as ArtworkCategory,
      creatorId,
    });

    return res.status(201).json({
      message: "Artwork submitted successfully and is awaiting review",
      data: artwork,
    });
  } catch (error) {
    console.error("Artwork submission failed:", error);

    return res.status(500).json({
      message: "Failed to submit artwork",
    });
  }
}

export async function getPendingArtworksController(
  req: Request,
  res: Response
) {
  try {
    const artworks = await getPendingArtworks();

    return res.status(200).json({
      message: "Pending artworks retrieved successfully",
      data: artworks,
    });
  } catch (error) {
    console.error("Failed to retrieve pending artworks:", error);

    return res.status(500).json({
      message: "Failed to retrieve pending artworks",
    });
  }
}


export async function approveArtworkController(
  req: Request,
  res: Response
) {
  try {
    const artworkId = req.params.id;
    const adminId = req.appUser?.id;

    if (typeof artworkId !== "string" || !adminId) {
      return res.status(400).json({
        message: "Invalid artwork request",
      });
    }

    const updatedCount = await approveArtwork(artworkId, adminId);

    if (updatedCount === 0) {
      return res.status(404).json({
        message: "Artwork not found or already reviewed",
      });
    }

    return res.status(200).json({
      message: "Artwork approved successfully",
    });
  } catch (error) {
    console.error("Artwork approval failed:", error);

    return res.status(500).json({
      message: "Failed to approve artwork",
    });
  }
}

export async function rejectArtworkController(
  req: Request,
  res: Response
) {
  try {
    const artworkId = req.params.id;
    const adminId = req.appUser?.id;
    const reason = req.body?.reason;

    if (typeof artworkId !== "string" || !adminId) {
      return res.status(400).json({
        message: "Invalid artwork request",
      });
    }

    if (
      typeof reason !== "string" ||
      !reason.trim() ||
      reason.trim().length > 1000
    ) {
      return res.status(400).json({
        message: "A rejection reason between 1 and 1000 characters is required",
      });
    }

    const updatedCount = await rejectArtwork(
      artworkId,
      adminId,
      reason.trim()
    );

    if (updatedCount === 0) {
      return res.status(404).json({
        message: "Artwork not found or already reviewed",
      });
    }

    return res.status(200).json({
      message: "Artwork rejected successfully",
    });
  } catch (error) {
    console.error("Artwork rejection failed:", error);

    return res.status(500).json({
      message: "Failed to reject artwork",
    });
  }
}