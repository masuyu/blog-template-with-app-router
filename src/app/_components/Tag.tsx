import Link from 'next/link'

type Props = {
    name: string
}

export const Tag = ({ name }: Props) => {
    return (
        <Link href={`/tags/${name}/posts`}>
            <span className='p-1 text-xs'>#{name}</span>
        </Link>
    )
}
