import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Divider,
  Skeleton,
  Alert,
  AlertTitle,
  Stack
} from '@mui/material'
import { 
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Comment as CommentIcon
} from '@mui/icons-material'

const Post = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)
        setError(null)

        // 포스트 상세 정보 가져오기
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        if (!postResponse.ok) {
          throw new Error('포스트를 찾을 수 없습니다.')
        }
        const postData = await postResponse.json()
        setPost(postData)

        // 사용자 정보와 댓글을 병렬로 가져오기
        const [userResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        ])

        if (!userResponse.ok) {
          throw new Error('사용자 정보를 가져올 수 없습니다.')
        }
        if (!commentsResponse.ok) {
          throw new Error('댓글을 가져올 수 없습니다.')
        }

        const userData = await userResponse.json()
        const commentsData = await commentsResponse.json()

        setUser(userData)
        setComments(commentsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPostData()
    }
  }, [postId])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Skeleton variant="rectangular" width={96} height={32} />
              <Skeleton variant="rectangular" width={64} height={24} />
            </Box>
            <Stack spacing={2}>
              <Skeleton variant="text" width="75%" height={32} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="83%" height={20} />
            </Stack>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Skeleton variant="text" width={128} height={24} sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={1.5}>
                  <Skeleton variant="text" width={96} height={20} />
                  <Skeleton variant="text" width={128} height={16} />
                  <Skeleton variant="text" width={160} height={16} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1.5}>
                  <Skeleton variant="text" width={64} height={20} />
                  <Skeleton variant="text" width={192} height={16} />
                  <Skeleton variant="text" width={144} height={16} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1.5}>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={128} height={16} />
                  <Skeleton variant="text" width={160} height={16} />
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Skeleton variant="text" width={96} height={24} sx={{ mb: 3 }} />
            <Stack spacing={2}>
              {[1, 2, 3, 4, 5].map(index => (
                <Box key={index} sx={{ pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Skeleton variant="text" width={96} height={16} />
                    <Skeleton variant="text" width={128} height={16} />
                  </Box>
                  <Skeleton variant="text" width="100%" height={16} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h1" sx={{ mb: 2 }}>😕</Typography>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            오류가 발생했습니다
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {error}
          </Typography>
          <Button
            component={Link}
            to="/posts"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            size="large"
          >
            포스트 목록으로 돌아가기
          </Button>
        </Paper>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h1" sx={{ mb: 2 }}>🔍</Typography>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            포스트를 찾을 수 없습니다
          </Typography>
          <Button
            component={Link}
            to="/posts"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            size="large"
            sx={{ mt: 2 }}
          >
            포스트 목록으로 돌아가기
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Button
              component={Link}
              to="/posts"
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'primary.main' }}
            >
              포스트 목록
            </Button>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main', bgcolor: 'primary.50', px: 2, py: 0.5, borderRadius: 1 }}>
              Post #{post.id}
            </Typography>
          </Box>

          <article>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              {post.title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              {post.body}
            </Typography>
          </article>
        </Paper>

        {/* 작성자 정보 */}
        {user && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              👤 작성자 정보
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" />
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {user.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon fontSize="small" />
                    {user.website}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    📍 주소
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.address.street}, {user.address.suite}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.address.city}, {user.address.zipcode}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    🏢 회사
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {user.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company.catchPhrase}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* 댓글 목록 */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            💬 댓글 ({comments.length}개)
          </Typography>
          {comments.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              아직 댓글이 없습니다.
            </Typography>
          ) : (
            <Stack spacing={3}>
              {comments.map(comment => (
                <Box key={comment.id} sx={{ pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {comment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({comment.email})
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {comment.body}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Stack>
    </Container>
  )
}

export default Post