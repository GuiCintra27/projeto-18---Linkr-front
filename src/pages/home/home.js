import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../contexts/userInfo";
import Header from "../../components/Header/Header";
import { ActionModal } from "../../components/ActionModalPost/ActionModalPost";
import Page from "../../components/timeline/page";
import CreatePost from "./createPost";
import Post from "./post";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";
import Loading from "../../components/loading/loading";
import useInterval from "use-interval";
import { TfiReload } from "react-icons/tfi";
import UIInfiniteScroll from "../../components/infiniteScroll/infiniteScroll";
import LoadingSubtitle from "../../components/loading/loadingSubtitle";
import { fetchMore, reloadPosts, verifyRecentPosts } from "../../components/timeline/functions";
import { postsContext } from "../../contexts/postsContext";

export default function Home() {
  const { header } = useContext(UserInfoContext);
  const { posts, setPosts, loaded, setLoaded, recentPosts, setRecentPosts, loadPostsPhrase, setLoadPostsPhrase, URL, source, hashReposts, setHashReposts, followingCount, setFollowingCount } = useContext(postsContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postIdClicked, setClicked] = useState(null);

  useEffect(() => {
    if (recentPosts > 0 || recentPosts === null) {
      reloadPosts(false, setLoadPostsPhrase, setRecentPosts, setPosts, setLoaded,  URL, header, source, setHashReposts, setFollowingCount);
    }
  }, []);

  useInterval(() => {
    verifyRecentPosts(loaded, posts, setRecentPosts, URL, header, source);
  }, 15000);

  function openModal(postId, modalType) {
    setIsOpen(modalType);
    setClicked(postId);
  }


  async function callFetchMore() {
    fetchMore(setLoaded, posts, setPosts, URL, header, source, setFollowingCount);
  }

  return (
    <Page>
      <Header />
      <ActionModal setIsOpen={setIsOpen} postIdClicked={postIdClicked} modalIsOpen={modalIsOpen} />
      <main>
        <div id="timeline">
          <h1 id="title">timeline</h1>

          <CreatePost />

          {recentPosts > 0 && (
            <div id="recentPosts" onClick={() => reloadPosts(true, setLoadPostsPhrase, setRecentPosts, setPosts, setLoaded,  URL, header, source, setHashReposts)}>
              <p>{recentPosts === 0.5 ? '' : recentPosts} {loadPostsPhrase}</p>
              <TfiReload />
            </div>
          )}

          {posts.map((item, index) => (
            <>
              <Post post={item} shares={hashReposts[item.id]} openModal={openModal} key={index} isHome={true} />

              {index === posts.length - 1 && (
                <UIInfiniteScroll fetchMore={callFetchMore} />
              )}
            </>
          ))}

          {
            loaded && posts.length === 0 && (followingCount > 0 ? <h1 id="noPosts">No posts found from your friends</h1> : <h1 id="noPosts">You don't follow anyone yet. Search for new friends!</h1>)
          }

          {!loaded &&
            (<>
              <Loading />
              {posts.length > 0 && <LoadingSubtitle />}
            </>)
          }
        </div>

        <TrendingBox posts={posts} />
      </main>
    </Page>
  );
}