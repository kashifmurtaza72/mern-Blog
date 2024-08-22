import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized'
  })
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    const UrlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = UrlParams.get('searchTerm')
    const sortFromUrl = UrlParams.get('sort')
    const categoryFromUrl = UrlParams.get('category')
    if(searchTermFromUrl || sortFromUrl || categoryFromUrl) setSidebarData({...sidebarData, searchTerm: searchTermFromUrl, category: categoryFromUrl, sort: sortFromUrl})

      const fetchPosts = async () => {
        setLoading(true)
        const res = await fetch(`/api/post/getPosts?searchTerm=${sidebarData.searchTerm}&category=${sidebarData.category}&sort=${sidebarData.sort}&limit=10${showMore? `&skip=${posts.length}` : ''}`)
        const data = await res.json()
        if(res.ok) {
          setPosts([...posts,...data.posts])
          setShowMore(data.posts.length === 10)
          setLoading(false)
        }
      }
      fetchPosts()

  }, [location.search])

  console.log(posts)
  return (
    <div>
      <div className="">
        <form action="">
          <div className="">
            <label>Search Term:</label>
            <TextInput placeholder="Search..." id='searchTerm' type="text" />
          </div>

        </form>
      </div>
    </div>
  )
}
