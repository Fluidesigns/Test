"use client";

import { motion } from "framer-motion";
import { FilterChip } from "@/components/ui/chip";

export function FiltersRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 flex-wrap"
    >
      <FilterChip label="Last 7 days" />
      <FilterChip label="Request Type" />
      <FilterChip label="Function" />
    </motion.div>
  );
}
