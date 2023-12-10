import Link from 'next/link'
import { Suspense } from 'react'

import { Category } from '@/app/_components/Category'
import { Tag } from '@/app/_components/Tag'
import { fetchPosts } from '@/app/_lib'
import { PostHead } from '@/app/types'

export default async function CategorizedPosts({
    params,
}: {
    params: { category: string }
}) {
    const categoryName = params.category
    const callback = (post: PostHead) => {
        return post.category === categoryName
    }
    const posts = await fetchPosts({ fn: callback })

    return (
        <div>
            <h1>{`カテゴリー/${categoryName} 一覧記事`}</h1>
            <ul>
                <Suspense>
                    {posts?.map((post) => (
                        <>
                            <li key={post.id}>
                                <Link href={'posts/' + post.id}>{post.title}</Link>
                                <span className='pl-1 text-xs text-stone-400'>
                                    {post.createdAt}
                                </span>
                                <Category name={post.category} />
                                {post.tags.map((tag) => {
                                    return (
                                        <span key={`${post.id}-${tag}`} className='ml-1'>
                                            <Tag name={tag} />
                                        </span>
                                    )
                                })}
                            </li>
                        </>
                    ))}
                </Suspense>
            </ul>
        </div>
    )
}
