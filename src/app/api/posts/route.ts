import fs from 'fs'

import matter from 'gray-matter'

import { PostHead } from '@/app/types'

export const GET = () => {
    const files = fs.readdirSync('src/posts')
    const posts: PostHead[] = files.map((fileName) => {
        const fileContent = fs.readFileSync(`src/posts/${fileName}`, 'utf-8')
        const { data } = matter(fileContent)

        return {
            id: data.id as string,
            title: data.title as string,
            category: data.category as string,
            tags: data.tags as string[],
            createdAt: data.date as string,
        }
    })

    return new Response(JSON.stringify(posts))
}
