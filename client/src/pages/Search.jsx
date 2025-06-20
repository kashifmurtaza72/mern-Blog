import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "./../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    order: "desc",
    category: "all",
  });
  //console.log(sidebarData, 'kkkk')
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = UrlParams.get("searchTerm");
    const orderFromUrl = UrlParams.get("order");
    const categoryFromUrl = UrlParams.get("category");
    if (searchTermFromUrl || orderFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
        order: orderFromUrl,
      });
    }
    //console.log(sidebarData, searchTermFromUrl, 'testing...........')
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = UrlParams.toString();
      //console.log(searchQuery)
      const res = await fetch(`/api/post/getposts?${searchQuery}`, {
        method: "GET",
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        setShowMore(data.posts.length === 9 || false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("order", sidebarData.order);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex", startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/post/getposts?${searchQuery}`, {
      method: "GET",
    });
    if (!res.ok) {
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      setShowMore(data.posts.length >= 9);
    }

  }

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
    }
    if (e.target.id === "order") {
      //const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
    }
    if (e.target.id === "category") {
      //const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex text-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.order} id="order">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="all">All</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React</option>
              <option value="nextjs">NextJS</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" gradientDuoTone="purpleToPink" outline>
            Apply filter
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Post Results</h1>
        <div className="flex flex-wrap gap-3 p-2">
          {!loading && posts.length === 0 && <p className="text-xl text-gray-500">No Posts found.</p>}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading && posts &&
            posts.map((post) => <PostCard post={post} key={post._id} />)}
          {showMore && <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">Show More</button>}
        </div>
      </div>
    </div>
  );
}
