import { locales } from "@/utils/utils";

export type locale = (typeof locales)[number]
export type loading_status = "loading" | "success" | "failed"