import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import service from '../../appWrite/config'

function PostForm({ post }) {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })
  const userData = useSelector(state => state.auth.userData)
  const [error, setError] = useState('')

  const submit = async (data) => {
    setError('')
    try {
      if (post) {
        // Update existing post
        let featuredImageId = post.featuredimage || post.featuredImage
        if (data.image && data.image[0]) {
          const file = await service.uploadFile(data.image[0])
          if (file) {
            if (post.featuredimage) {
              service.deleteFile(post.featuredimage)
            }
            featuredImageId = file.$id
          }
        }
        const updatedPost = await service.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredimage: featuredImageId,
        })
        if (updatedPost) {
          navigate(`/post/${post.$id}`)
        }
      } else {
        // Create new post
        if (!data.image || !data.image[0]) {
          setError('Featured image is required')
          return
        }
        const file = await service.uploadFile(data.image[0])
        if (!file) {
          setError('Failed to upload image')
          return
        }
        const newPost = await service.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: file.$id,
          userid: userData.$id,
        })
        if (newPost) {
          navigate(`/post/${newPost.$id}`)
        }
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const slugTransform = useCallback((value) => {
  if (value && typeof value === 'string') {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 36)
  }
  return ''
}, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {error && <p className="text-red-600 mb-4 w-full">{error}</p>}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredimage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm