export type PostHead = {
    id: string
    title: string
    category: string
    tags: string[]
    createdAt: string
    updatedAt?: string
}

export type Post = PostHead & {
    content: string
}
