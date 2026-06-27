import Url from "../models/Url.js";
import dotenv from "dotenv";
import { generateCode, isValidUrl } from "../utils/functions.js";
import {
  STATUS_CODE,
  BadRequestError,
  NotFoundError,
} from "../errors/error.js";

dotenv.config();

//shorten url
export const shortenUrl = async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url != "string") {
    throw BadRequestError("url is required and must be a string");
  }

  const urlIsValid = isValidUrl(url);
  if (!urlIsValid) {
    throw BadRequestError("Enter a valid url");
  }

  const urlCode = generateCode(6, true);

  const newUrl = `http//localhost:${process.env.PORT}/url-sh-api/v1/${urlCode}`;

  const newUrlModel = new Url({
    originalUrl: url,
    shortCode: urlCode,
    clickCount: 0,
  });
  await newUrlModel.save();

  res.status(STATUS_CODE.CREATED).json({
    message: "URL shortened successfully",
    note: "It deletes after 10 days",
    newUrl,
  });
};

//redirect url
export const redirectUrl = async (req, res) => {
  const { code } = req.params;

  const url = await Url.findOne({ shortCode: code });
  if (!url) {
    throw NotFoundError("Url Not found");
  }
  url.clickCount++;

  await url.save();

  res.redirect(url.originalUrl);
};

// get url analytics
export const getUrlAnalytics = async (req, res) => {
  const { code } = req.params;

  const url = await Url.findOne({ shortCode: code });
  if (!url) {
    throw NotFoundError("Url Not found");
  }

  res.status(STATUS_CODE.SUCCESS).json({
    OriginalUrl: url.originalUrl,
    ClickCount: url.clickCount,
    CreatedAt: url.createdAt,
  });
};
