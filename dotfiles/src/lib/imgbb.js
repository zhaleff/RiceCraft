const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Upload failed')
  }

  const data = await res.json()
  if (!data?.data?.url) throw new Error('imgbb no devolvió una URL válida')
  return data.data.url
}
