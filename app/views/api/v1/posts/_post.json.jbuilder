json.extract! post, :id, :title, :body, :views, :created_at, :updated_at
json.snippet truncate(post.body, length: 120)
