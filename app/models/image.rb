# frozen_string_literal: true
class Image < ApplicationRecord
  belongs_to :author, optional: true
  validates_presence_of :height, :width, :raw_url

  scope :from_source, -> (source) {
    where source: source
  }

  scope :search, -> (query) {
    joins('LEFT JOIN authors '\
            'AS images_authors '\
            'ON images.author_id = images_authors.id')
      .where('images.source ILIKE :query OR images.description ILIKE :query OR ' \
           'images_authors.first_name ILIKE :query OR images_authors.last_name ILIKE :query OR ' \
           'images_authors.username ILIKE :query', query: "%#{query}%")
      .references(:author)
  }
end
