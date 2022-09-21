import { defineStore } from 'pinia'
import { getTags } from 'src/boot/axios'
import { Tag } from 'src/types'

interface State {
  tagsState: Array<Tag>
}

export const useTagStore = defineStore('usersTags', {
  state: (): State => ({
    tagsState: [],
  }),
  actions: {
    async getTags() {
      this.tagsState = await getTags()
    },
    updateTag(tag: Tag) {
      const tagIndex = this.tagsState.findIndex((t) => t.id === tag.id)
      this.tagsState[tagIndex] = tag
    },
    addTag(tag: Tag) {
      this.tagsState.push(tag)
    },
  },
  getters: {
    tags(): Array<Tag> {
      return this.tagsState
    },
  },
})
