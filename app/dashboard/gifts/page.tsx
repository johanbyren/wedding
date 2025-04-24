import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { HeartIcon, ArrowLeft, Plus, Trash2, ImagePlus } from "lucide-react"
import { ImageUploader } from "~/components/image-uploader"
import { Alert, AlertDescription } from "~/components/ui/alert"

interface GiftItem {
  id: string
  name: string
  description: string
  price: string
  imageFile: File | null
  imagePreview: string
}

export default function ManageGifts() {
  const [giftItems, setGiftItems] = useState<GiftItem[]>([
    {
      id: "1",
      name: "Wedding Dress",
      description: "Help us fund the perfect wedding dress",
      price: "1500",
      imageFile: null,
      imagePreview: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Wedding Rings",
      description: "Contribute to our wedding rings",
      price: "1000",
      imageFile: null,
      imagePreview: "/placeholder.svg",
    },
  ])

  const [newItem, setNewItem] = useState<GiftItem>({
    id: "",
    name: "",
    description: "",
    price: "",
    imageFile: null,
    imagePreview: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageSelected = (file: File) => {
    const preview = URL.createObjectURL(file)
    setNewItem((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: preview,
    }))
  }

  const handleGiftImageSelected = (file: File, id: string) => {
    const preview = URL.createObjectURL(file)
    setGiftItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              imageFile: file,
              imagePreview: preview,
            }
          : item,
      ),
    )
  }

  const addNewItem = () => {
    if (newItem.name && newItem.price) {
      const id = Date.now().toString()
      setGiftItems((prev) => [...prev, { ...newItem, id }])
      setNewItem({
        id: "",
        name: "",
        description: "",
        price: "",
        imageFile: null,
        imagePreview: "",
      })
    }
  }

  const removeItem = (id: string) => {
    setGiftItems((prev) => prev.filter((item) => item.id !== id))
  }

  const startEditing = (item: GiftItem) => {
    setNewItem(item)
    setIsEditing(true)
    setEditingId(item.id)
  }

  const cancelEditing = () => {
    setNewItem({
      id: "",
      name: "",
      description: "",
      price: "",
      imageFile: null,
      imagePreview: "",
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const saveEditing = () => {
    if (editingId) {
      setGiftItems((prev) =>
        prev.map((item) => (item.id === editingId ? { ...newItem, id: editingId } : item)),
      )
      cancelEditing()
    }
  }

  const saveGiftRegistry = () => {
    // Here you would typically save to your backend
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <HeartIcon className="h-6 w-6 text-pink-500" />
          <span>WeddingWish</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Manage Gift Registry</h1>
            <Button onClick={saveGiftRegistry} className="bg-pink-500 hover:bg-pink-600">
              Save Registry
            </Button>
          </div>

          {saveSuccess && (
            <Alert className="mb-6">
              <AlertDescription>Gift registry saved successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Edit Gift" : "Add New Gift"}</CardTitle>
                <CardDescription>
                  {isEditing
                    ? "Update the details of your gift item"
                    : "Add a new item to your gift registry"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newItem.name}
                    onChange={handleNewItemChange}
                    placeholder="e.g., Wedding Dress"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newItem.description}
                    onChange={handleNewItemChange}
                    placeholder="Describe the gift and why it's important to you"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newItem.price}
                    onChange={handleNewItemChange}
                    placeholder="e.g., 1500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <ImageUploader
                    onImageSelected={handleImageSelected}
                    preview={newItem.imagePreview}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {isEditing && (
                  <Button variant="outline" onClick={cancelEditing}>
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={isEditing ? saveEditing : addNewItem}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  {isEditing ? "Save Changes" : "Add Gift"}
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Gift Registry</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {giftItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={item.imagePreview}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <p className="text-lg font-semibold mt-2">${item.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEditing(item)}
                          >
                            <ImagePlus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
