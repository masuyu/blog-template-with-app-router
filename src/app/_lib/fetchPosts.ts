import { PostHead } from '../types'

type Callback = {
    fn: (post: PostHead) => boolean
}

export const fetchPosts = async (callback?: Callback) => {
    const res: Response = await fetch(`${process.env.APP_URL}/api/posts`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch posts')
    }
    const data = (await res.json()) as PostHead[]

    if (callback !== undefined) {
        return [...data]
            .filter(callback.fn)
            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
            .reverse()
    }

    return [...data]
        .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
        .reverse()
}
