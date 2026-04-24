import { useState } from 'react'
import { Trash2, Upload } from 'lucide-react'
import { DashboardHeader } from '../dashboard/DashboardHeader'
import { PostsTable } from './PostsTable'
import { usePostsContext } from '@/app/context/posts'
import { IPost } from '@/interfaces/interfaces'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type PostFormState = {
  title: string
  subtitle: string
  header: string
  mainContent: string
  footer: string
  keywords: string
  size: string
}

const emptyForm: PostFormState = {
  title: '',
  subtitle: '',
  header: '',
  mainContent: '',
  footer: '',
  keywords: '',
  size: '1',
}

const mapPostToForm = (post: IPost): PostFormState => ({
  title: post.title,
  subtitle: post.subtitle,
  header: post.header,
  mainContent: post.mainContent,
  footer: post.footer,
  keywords: post.keywords.join(', '),
  size: String(post.size),
})

export function PostsPage() {
  const { createPost, updatePost, isLoading } = usePostsContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<IPost | null>(null)
  const [form, setForm] = useState<PostFormState>(emptyForm)
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [extraImages, setExtraImages] = useState<File[]>([])
  const [existingExtraImages, setExistingExtraImages] = useState<string[]>([])

  const isEditing = Boolean(editingPost)

  const openCreateDialog = () => {
    setEditingPost(null)
    setForm(emptyForm)
    setMainImage(null)
    setExtraImages([])
    setExistingExtraImages([])
    setIsCreateDialogOpen(true)
  }

  const openEditDialog = (post: IPost) => {
    setEditingPost(post)
    setForm(mapPostToForm(post))
    setMainImage(null)
    setExtraImages([])
    setExistingExtraImages(post.extraImages)
    setIsCreateDialogOpen(true)
  }

  const closeDialog = () => {
    setIsCreateDialogOpen(false)
    setEditingPost(null)
    setForm(emptyForm)
    setMainImage(null)
    setExtraImages([])
    setExistingExtraImages([])
  }

  const handleChange = (field: keyof PostFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setMainImage(e.target.files[0])
  }

  const handleExtraImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setExtraImages(Array.from(e.target.files))
  }

  const payload = {
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    header: form.header.trim(),
    mainContent: form.mainContent.trim(),
    footer: form.footer.trim(),
    keywords: form.keywords
      .split(',')
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    size: Number(form.size),
  }

  const removeExistingExtraImage = (imageUrl: string) => {
    setExistingExtraImages((currentImages) =>
      currentImages.filter((currentImage) => currentImage !== imageUrl),
    )
  }

  const handleSavePost = async () => {
    try {
      if (isEditing && editingPost) {
        await updatePost(
          editingPost.id,
          {
            ...payload,
            extraImages: existingExtraImages,
          },
          mainImage,
          extraImages,
        )
        toast.success('Post actualizado correctamente')
      } else {
        await createPost(payload, mainImage, extraImages)
        toast.success('Post creado correctamente')
      }

      closeDialog()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : isEditing
            ? 'No se pudo actualizar el post'
            : 'No se pudo crear el post'
      toast.error(message)
    }
  }

  const currentMainImage = mainImage
    ? URL.createObjectURL(mainImage)
    : editingPost?.image ?? null

  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      <DashboardHeader
        title="Posts"
        subtitle="Gestiona las publicaciones de la plataforma"
        onSearch={setSearchQuery}
        onCreate={openCreateDialog}
        createButtonLabel="Crear Post"
      />

      <main className="p-6 lg:p-8">
        <PostsTable searchQuery={searchQuery} onEdit={openEditDialog} />
      </main>

      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Post' : 'Crear Nuevo Post'}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Actualiza el contenido del post, sus imagenes y el tamano del grid.'
                : 'Crea una nueva publicacion.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label>Titulo</Label>
              <Input
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div>
              <Label>Subtitulo</Label>
              <Input
                value={form.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
              />
            </div>

            <div>
              <Label>Header</Label>
              <Input
                value={form.header}
                onChange={(e) => handleChange('header', e.target.value)}
              />
            </div>

            <div>
              <Label>Contenido</Label>
              <textarea
                rows={6}
                className="w-full border rounded-lg p-3"
                value={form.mainContent}
                onChange={(e) => handleChange('mainContent', e.target.value)}
              />
            </div>

            <div>
              <Label>Footer</Label>
              <Input
                value={form.footer}
                onChange={(e) => handleChange('footer', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen principal</Label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleMainImage}
              />

              {currentMainImage && (
                <img
                  src={currentMainImage}
                  alt="Vista previa de la imagen principal"
                  className="w-full h-40 object-cover rounded-lg border"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Imagenes adicionales</Label>

              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleExtraImages}
              />

              {editingPost && editingPost.extraImages.length > 0 && (
                <p className="text-xs text-[#6E6E6E]">
                  Este post ya tiene {editingPost.extraImages.length} imagenes adicionales.
                  Puedes quitar las actuales y las nuevas imagenes se agregaran a las que dejes.
                </p>
              )}

              {existingExtraImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {existingExtraImages.map((imageUrl, index) => (
                    <div key={imageUrl} className="relative">
                      <img
                        src={imageUrl}
                        alt={`Imagen adicional actual ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingExtraImage(imageUrl)}
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-red-600 shadow"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {extraImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {extraImages.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt={`Vista previa adicional ${i + 1}`}
                      className="h-24 w-full object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Keywords</Label>
              <Input
                placeholder="cuidado, adultos mayores"
                value={form.keywords}
                onChange={(e) => handleChange('keywords', e.target.value)}
              />
            </div>

            <div>
              <Label>Tamano del grid</Label>
              <Input
                type="number"
                min="1"
                max="12"
                value={form.size}
                onChange={(e) => handleChange('size', e.target.value)}
              />
              <p className="text-xs text-[#6E6E6E] mt-1">
                `size` define cuanto espacio ocupa el post dentro del grid.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>

            <Button
              onClick={handleSavePost}
              disabled={isLoading}
              className="bg-[#D4A03A] hover:bg-[#B88A2F] text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isLoading
                ? isEditing
                  ? 'Actualizando...'
                  : 'Guardando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Crear Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
