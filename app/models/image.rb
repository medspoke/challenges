# frozen_string_literal: true
class Image < ApplicationRecord
  belongs_to :author, optional: true
  validates_presence_of :height, :width, :raw_url

  scope :from_source, -> (source) {
    where('images.source = ?', source)
  }

  scope :without_source, -> {
    Image.from_source(nil)
  }
end
