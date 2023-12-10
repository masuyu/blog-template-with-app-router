import fs from 'fs'

import matter from 'gray-matter'

import { Post } from '@/app/types'

export const GET = (_: Request, { params }: { params: { slug: string } }) => {
    const files = fs.readdirSync('src/posts')
    const fileName: string | undefined = files.find((fileName) => {
        return fileName.replace(/\.md$/, '') === params.slug
    })

    if (fileName === undefined) {
        return new Response(null, { status: 404 })
    }

    const fileContent = fs.readFileSync(`src/posts/${fileName}`, 'utf-8')
    const { data, content } = matter(fileContent)
    const post: Post = {
        id: data.id as string,
        title: data.title as string,
        content: content,
        category: data.category as string,
        tags: data.tags as string[],
        createdAt: data.date as string,
    }

    return new Response(JSON.stringify(post))
}
