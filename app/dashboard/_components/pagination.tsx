import { PaginationResult } from "@/utils/pagination"
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  config: Omit<PaginationResult<unknown>, "data">
  onPageChange: (page: number) => void
}

export const Pagination = ({ config, onPageChange }: PaginationProps) => {
  return (
    <PaginationBase>
      <PaginationContent>
        {config.page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPageChange(config.page - 1)
              }}
            />
          </PaginationItem>
        )}

        {config.page > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {config.page === config.totalPages && config.totalPages >= 3 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPageChange(config.page - 2)
              }}
            >
              {config.page - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {config.page > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPageChange(config.page - 1)
              }}
            >
              {config.page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(event) => {
              event.preventDefault()
            }}
            isActive
          >
            {config.page}
          </PaginationLink>
        </PaginationItem>

        {config.page < config.totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPageChange(config.page + 1)
              }}
            >
              {config.page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {config.page === 1 && config.totalPages >= 3 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPageChange(config.page + 2)
              }}
            >
              {config.page + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {config.page < config.totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {config.totalPages > 1 && config.page < config.totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPageChange(config.page + 1)
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationBase>
  )
}
