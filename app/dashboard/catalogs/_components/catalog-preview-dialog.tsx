"use client"

import { CopyIcon, ExternalLinkIcon, ShareIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Catalog } from "@/types"
import { ClientCatalogView } from "@/app/(shop)/catalog/[catalogId]/_components/client-catalog-view"

interface CatalogPreviewDialogProps {
  catalog: Catalog
  open: boolean
  onOpenChange: (value: boolean) => void
}

export const CatalogPreviewDialog = ({
  catalog,
  open,
  onOpenChange,
}: CatalogPreviewDialogProps) => {
  const catalogLink = `${window.location.origin}/catalog/${catalog.id}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(catalogLink)
    toast.success("Sucesso!", {
      description: "Link do catálogo copiado com sucesso!",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] sm:h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Visualização do Catálogo: {catalog.name}</DialogTitle>
          <DialogDescription>
            Visualize como seu catálogo aparecerá para os clientes ou
            compartilhe-o diretamente.
          </DialogDescription>
        </DialogHeader>

        <Tabs className="flex-1 flex flex-col" defaultValue="Preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Visualização</TabsTrigger>
            <TabsTrigger value="share">Compartilhar</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 mt-4 overflow-hidden">
            <div className="border rounded-md h-full overflow-hidden p-4">
              <ClientCatalogView catalog={catalog} isPreview />
            </div>
          </TabsContent>

          <TabsContent value="share" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Link do Catálogo</h3>
                <div className="flex gap-2">
                  <Input value={catalogLink} readOnly className="flex-1" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Compartilhe este link com seus clientes para visualizar este
                  catálogo.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">
                  Opções de Compartilhamento
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => console.log("Share by Email")}
                  >
                    <ShareIcon className="h-4 w-4" />
                    Compartilhar via E-mail
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => console.log("Share by WhatsApp")}
                  >
                    <ShareIcon className="h-4 w-4" />
                    Compartilhar via WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => console.log("Open in New Tab")}
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    Abrir em Nova Aba
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">
                  Configurações do Catálogo
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status do Catálogo</span>
                    <span className="text-sm font-medium">
                      {catalog.isActive ? "ATIVO" : "INATIVO"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Produtos</span>
                    <span className="text-sm font-medium">
                      {catalog.products?.length ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Criado em</span>
                    <span className="text-sm font-medium">
                      {new Date(catalog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
