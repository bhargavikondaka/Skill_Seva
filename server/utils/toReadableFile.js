export default async function toReadableFile(buffer, filename) {
  return {
    name: filename,
    type: 'application/octet-stream',
    arrayBuffer: async () => buffer
  };
}
