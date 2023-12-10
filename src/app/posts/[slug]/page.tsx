import { Suspense } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Category } from '@/app/_components/Category'
import { Loading } from '@/app/_components/Loading'
import { Tag } from '@/app/_components/Tag'
import { Post } from '@/app/types'

const getPost = async (slug: string) => {
    const res: Response = await fetch(`${process.env.APP_URL}/api/posts/${slug}`, {
        next: { revalidate: 60 },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch post')
    }

    const data = (await res.json()) as Post
    return data
}

const Post = async ({ params }: { params: { slug: string } }) => {
    const post = await getPost(params.slug)

    return (
        <Suspense fallback={<Loading />}>
            <div>
                <h1 className='text-3xl'>{post.title}</h1>
                <div>
                    <p>{post.createdAt}</p>
                </div>
                <div>
                    <Category name={post.category} />
                    {post.tags.map((tag) => {
                        return (
                            <span key={tag} className='ml-1'>
                                <Tag name={tag} />
                            </span>
                        )
                    })}
                </div>
                <div className='py-10'>
                    <Markdown remarkPlugins={[remarkGfm]} className={'markdown'}>
                        {post.content}
                    </Markdown>
                </div>
            </div>
        </Suspense>
    )
}
export default Post
