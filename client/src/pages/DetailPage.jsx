import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Preloader } from '../common/Preloader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { LinkCard } from '../components/LinkCard'


export const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [link, setLink] = useState('')
    const linkId = useParams().id


    useEffect(() => {
        const getLink = async() => {
            try {
                const fetched = await request(`/api/link/${ linkId }`, 'GET', null, { Authorization: `Bearer ${ token }`})
                setLink(fetched)
            } catch (e) {}
        }
        getLink()
    }, [token, linkId, request])

    if(loading) {
        return <Preloader />
    }

    return (
        <>
          { !loading && link && <LinkCard link={ link } /> }
        </>
    )
}