import React, { useState } from 'react'
import { useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { useCallback } from 'react'
import { useEffect } from 'react'
import {Loader} from '../components/Loader'
import {LinkList} from '../components/LinkList'

export const Links = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])
    
    useEffect(() => {
        fetchLinks()
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinkList links={links} />}
        </>
    )
}