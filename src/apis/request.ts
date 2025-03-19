export async function get(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
  }
}
