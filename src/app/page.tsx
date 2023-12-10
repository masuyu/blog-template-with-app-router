import Link from 'next/link'
import { Suspense } from 'react'

import { Category } from '@/app/_components/Category'
import { Tag } from '@/app/_components/Tag'

import { fetchPosts } from './_lib'

export default async function Home() {
    const posts = await fetchPosts()

    return (
        <div>
            <h1>新着記事</h1>
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
