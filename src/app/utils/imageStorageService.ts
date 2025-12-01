import { storage } from "../../../firebaseConfig";

type UploadParams = {
  blobsUrls: string[];
  slugProduct: string;
};

async function blobUrlToBlob(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const mime = blob.type || "image/jpeg";
  if (blob.type) return blob;

  const buffer = await blob.arrayBuffer();
  return new Blob([buffer], { type: mime });
}

export async function uploadImages({
  blobsUrls,
  slugProduct,
}: UploadParams): Promise<string[]> {
  if (!blobsUrls || blobsUrls.length === 0) {
    return [];
  }

  const finalUrls: string[] = [];

  const checkedBlobsUrls: string[] = [];

  for (const url of blobsUrls) {
    if (url.startsWith("blob:")) {
      checkedBlobsUrls.push(url);
    }
    if (url.includes("https://firebasestorage.googleapis.com")) {
      finalUrls.push(url);
    }
  }

  const blobs = await Promise.all(checkedBlobsUrls.map(blobUrlToBlob));
  const uploadTasks = blobs.map((blob, index) => {
    const mimeType = blob.type;
    const extension = mimeType.split("/")[1];
    const safeExt = extension || "jpg";

    const storageRef = storage.ref();

    const imageRef = storageRef.child(
      `images/fk_${slugProduct}image_${Date.now()}_${index}.${safeExt}`
    );

    return imageRef.put(blob).then(async (snapshot) => {
      const downloadURL = await snapshot.ref.getDownloadURL();
      return downloadURL;
    });
  });

  const uploadedUrls = await Promise.all(uploadTasks);
  return [...finalUrls, ...uploadedUrls];
}

export async function deleteImage(imageUrls: string[]): Promise<void> {
  if (!imageUrls || imageUrls.length === 0) return;

  const deleteTasks = imageUrls.map(async (url) => {
    try {
      const storageRef = storage.refFromURL(url);
      await storageRef.delete();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        console.log("Imagem já não existia:", url);
        return;
      }
    }
  });

  await Promise.all(deleteTasks);
}
