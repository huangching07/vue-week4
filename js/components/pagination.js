export default{
    props: ['pagination'],
    methods: {
        getProducts(page) {
            this.$emit('getProducts-emit', page);
        }
    },
    template:`
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: !pagination.has_pre }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li v-for="page in pagination.total_pages" :key="'page' + page" :class="{ active: page === pagination.current_page }" class="page-item">
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: !pagination.has_next }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    `
};