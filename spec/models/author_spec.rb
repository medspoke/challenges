# frozen_string_literal: true
describe Author, type: :model do
  describe 'Relations' do
    it { is_expected.to has_many(:image) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of :username }
  end
end
