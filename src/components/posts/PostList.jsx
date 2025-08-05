import { Grid } from '@mui/material'
import PostCard from './PostCard'
import SkeletonCard from './SkeletonCard'
import ErrorMessage from './ErrorMessage'

function PostList({ posts, loading, error, searchTerm, highlightEnabled }) {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }, (_, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <Grid container spacing={3}>
      {posts.map(post => (
        <Grid item xs={12} md={6} lg={4} key={post.id}>
          <PostCard 
            post={post} 
            searchTerm={searchTerm}
            highlightEnabled={highlightEnabled}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostList 