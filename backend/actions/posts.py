from backend.submodels.post import *
from backend.submodels.user import User

def get_followed_posts(username, page, type):
    user = User.objects.get(pk=username)
    posts = []
    page_size = 6
    posts_records = PostFollowed.objects.filter(user=user, post__type=type)
    for record in posts_records[page * page_size: min(posts_records.count(), (page + 1) * page_size)]:
        posts.append(getPost(record.post, user))
    return posts

def post_assigns_groups(post, groups):
    post = Post.objects.get(pk=post)
    for group_id, add_condition in groups.items():
        if add_condition:
            group = Group.objects.get(pk=group_id)
            PostGroups.objects.create(post=post, group=group)

def getPostsDetails(posts_objects, page, user):
    posts_amount = posts_objects.count()
    page_size = 6
    posts = []
    if page_size * page >= posts_amount:
        return posts
    for i in range(page * page_size, min(posts_amount, (page + 1) * page_size)):
        posts.append(getPost(posts_objects[i], user))
    return posts

def getComments(post):
    comments = []
    comments_objs = Comment.objects.filter(post=post)
    for comment in comments_objs:
        comments.append({
            'user': comment.user.username,
            'content': comment.content,
            'image': comment.user.image,
        })
    return comments

def getGroups(post):
    groups = []
    groups_objects = PostGroups.objects.filter(post=post)
    for record in groups_objects:
        groups.append({
            'id': record.group.id,
            'name': record.group.name
        })
    return groups

def getPost(post, user):
    like_id = -1
    likes = Like.objects.filter(post=post, user=user)
    if likes.count() > 0:
        like_id = likes[0].id
    follow_record = PostFollowed.objects.filter(user=user, post=post)
    if follow_record.count() > 0:
        follow_id = follow_record[0].id
    else: 
        follow_id = -1
    return {
        'id': post.id,
        'title': post.title,
        'type': post.type,
        'user': post.user.username,
        'image': post.user.image,
        'content': post.content,
        'description': post.description,
        'date': post.date,
        'time': post.time,
        'like_id': like_id,
        'comments': getComments(post),
        'groups': getGroups(post),
        'followed': follow_id,
        'quantity': {
            'likes': postLikesQuantity(post),
            'comments': postCommentsQuantity(post)
        }
    }

def updatePost(post_id, title, description, content):
    post = Post.objects.filter(id=post_id)[0]
    post.title = title
    post.description = description
    post.content = content
    post.save()

def updateComment(comment_id, content):
    comment = Comment.objects.filter(id=comment_id)[0]
    comment.conent = content
    comment.save()

def postLikesQuantity(post):
    return Like.objects.filter(post=post).count()

def postCommentsQuantity(post):
    return Comment.objects.filter(post=post).count()

def isPostInGroup(post, group):
    groups = PostGroups.objects.filter(post=post, group=group)
    return groups.count() > 0

def getGroupPosts(group, page, user, type):
    posts = []
    page_size = 6
    results = PostGroups.objects.filter(group=group, post__type=type)
    results = results[page * page_size:(page + 1) * page_size]
    for record in results:
        posts.append(getPost(record.post, user))
    return posts

def postFeed(page, user, type):
    posts = Post.objects.filter(type=type).order_by('-date', '-time')
    return getPostsDetails(posts, page, user)

def followedGroups(username):
    return GroupFollowed.objects.filter(user=username)

def followedPosts(username):
    return PostFollowed.objects.filter(user=username)

def followPost(username, post):
    PostFollowed.objects.create(user=username, post=post)

def followGroup(username, group):
    GroupFollowed.objects.create(user=username, group=group)

def unfollowPost(username, post):
    followed = PostFollowed.objects.filter(user=username, post=post)
    if followed.count <= 0:
        return
    followed[0].delete()

def unfollowGroup(username, group):
    followed = GroupFollowed.objects.filter(user=username, group=group)
    if followed.count <= 0:
        return
    followed[0].delete()