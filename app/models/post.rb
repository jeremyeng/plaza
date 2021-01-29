class Post < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true

  after_create_commit { broadcast_prepend_to "posts" }
  has_rich_text :content
end
