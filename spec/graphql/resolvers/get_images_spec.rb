# frozen_string_literal: true
describe Resolvers::GetImages, type: :graphql do
  let!(:context) do
    create_context
  end

  subject(:resolver) { described_class.new(object: nil, context: context) }

  it { is_expected.to be_of_type([Types::ImageType]) }

  describe '#call' do
    context 'when some images exist' do
      let!(:image_1) { create :image }
      let!(:image_2) { create :image }
      let!(:image_3) { create :image }

      it 'returns all images' do
        # when
        images = resolver.resolve

        # then
        expect(images).to match_array([image_1, image_2, image_3])
      end

      context 'when some images are missing source' do
        before do
          image_3.source = nil
        end

        context 'when querying for images with given source' do
          let(:args) do
            { source: 'foo_images' }
          end

          it 'only returns images with given source' do
            # when
            images = resolver.resolve(args)

            # then
            expect(images).to match_array([image_1, image_2])
          end
        end

        context 'when querying for images without a source' do
          let(:args) do
            { no_source: true }
          end

          it 'only returns images without any source' do
            # when
            images = resolver.resolve(args)

            # then
            expect(images).to match_array([image_3])
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
