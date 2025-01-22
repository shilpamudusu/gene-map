import type React from "react"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface TissueDropdownProps {
  id?: string
  tissues: string[]
  selectedTissues: string[]
  onToggle: (tissue: string) => void
}

export const TissueDropdown: React.FC<TissueDropdownProps> = ({ id, tissues, selectedTissues, onToggle }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          Filter Tissues
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 max-h-64 overflow-y-auto">
        <DropdownMenuLabel>Select Tissues</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tissues.map((tissue, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={selectedTissues.includes(tissue)}
            onCheckedChange={() => onToggle(tissue)}
          >
            {tissue}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

