import Link from 'next/link'

type Props = {
    name: string
}

export const Category = ({ name }: Props) => {
    return (
        <Link href={`/categories/${name}/posts`}>
            <span className='p-1 text-xs'>/{name}</span>
        </Link>
    )
}
