# frozen_string_literal: true
describe Resolvers::GetImages, type: :graphql do
  let!(:context) do
    create_context
  end

  subject(:resolver) { described_class.new(object: nil, context: context) }

  it { is_expected.to be_of_type([Types::ImageType]) }

  describe '#call' do
    context 'when some images exist' do
      let(:image_1) { create :image, source: 'medspoke' }
      let(:image_2) { create :image, source: 'medspoke' }
      let(:image_3) { create :image, source: nil }

      it 'returns all images' do
        # when
        images = resolver.resolve

        # then
        expect(images).to match_array([image_1, image_2, image_3])
      end

      context 'when some images are missing source' do
        context 'when querying for images with given source' do
          let(:args) do
            { source: 'medspoke' }
          end

          it 'only returns images with given source' do
            # when
            images = resolver.resolve(args)

            # then
            expect(images).to match_array([image_1, image_2])
          end
        end
      end
    end

    context 'when no images exist' do
      it 'returns empty array' do
        # when
        images = resolver.resolve

        # then
        expect(images).to match_array([])
      end
    end
  end
end
