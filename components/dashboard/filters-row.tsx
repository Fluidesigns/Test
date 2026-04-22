"use client";

import { motion } from "framer-motion";
import { RefreshCw, Download } from "lucide-react";
import { FilterChip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

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
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
        <IconButton aria-label="Refresh">
          <RefreshCw className="h-3.5 w-3.5" />
        </IconButton>
      </div>
    </motion.div>
  );
}
