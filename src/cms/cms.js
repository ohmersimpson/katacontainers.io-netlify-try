import CMS from 'netlify-cms-app'

import CommunityPagePreview from './preview-templates/CommunityPagePreview'
import DocsPagePreview from './preview-templates/DocsPagePreview'
import LearnPagePreview from './preview-templates/LearnPagePreview'
import SoftwarePagePreview from './preview-templates/SoftwarePagePreview'
import SupportersPagePreview from './preview-templates/SupportersPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'
import { Widget as IdWidget } from '@ncwidgets/id'

const loadData = async (dataPath) => {
  const data = await fetch(dataPath)
    .then(data => data.json())
    .catch(err => console.error(err))

  window.repoFiles = data
}

loadData('src/content/authors.json');

CMS.registerWidget(IdWidget)
CMS.registerWidget(FileRelationWidget)

CMS.registerPreviewStyle('style/styles.scss');

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('community', CommunityPagePreview)
CMS.registerPreviewTemplate('docs', DocsPagePreview)
CMS.registerPreviewTemplate('learn', LearnPagePreview)
CMS.registerPreviewTemplate('software', SoftwarePagePreview)
CMS.registerPreviewTemplate('supporters', SupportersPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)