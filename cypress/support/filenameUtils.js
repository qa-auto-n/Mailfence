import { v4 as uuidv4 } from 'uuid'

export function generateUpdatedFilename(filename) {
    const extensionIndex = filename.lastIndexOf('.')
    if (extensionIndex !== -1) {
        const filenameWithoutExtension = filename.slice(0, extensionIndex)
        const fileExtension = filename.slice(extensionIndex)
        const uniqueId = uuidv4().slice(0, 6)
        return `${filenameWithoutExtension}_${uniqueId}${fileExtension}`
    } else {
        const uniqueId = uuidv4().slice(0, 6)
        return `${filename}_${uniqueId}`
    }
}