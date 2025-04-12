import { useCallback } from "react"

export function useBase64File() {
  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result)
        } else {
          reject("Erro ao converter arquivo para base64.")
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }, [])

  const base64ToFile = useCallback(
    (base64: string, filename: string, mimeType?: string): File => {
      const arr = base64.split(",")
      const mime =
        mimeType || arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream"
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    },
    []
  )

  return {
    fileToBase64,
    base64ToFile,
  }
}
