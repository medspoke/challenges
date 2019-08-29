# frozen_string_literal: true
class Image < ApplicationRecord
  belongs_to :author, optional: true
  validates_presence_of :height, :width, :raw_url
end
