export function appendIdToFilename(filename, uniqueId) {
    const extensionIndex = filename.lastIndexOf('.')
    if (extensionIndex !== -1) {
        const filenameWithoutExtension = filename.slice(0, extensionIndex)
        const fileExtension = filename.slice(extensionIndex)
        return `${filenameWithoutExtension}_${uniqueId}${fileExtension}`
    } else {
        return `${filename}_${uniqueId}`
    }
}

export function extractFilenameWithoutExtension(filenameWithExtension) {
    const extensionIndex = filenameWithExtension.lastIndexOf('.')
    if (extensionIndex !== -1) {
        return filenameWithExtension.slice(0, extensionIndex)
    } else {
        return filenameWithExtension
    }
}