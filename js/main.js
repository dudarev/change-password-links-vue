

new Vue ({
	el: '#header',
	data: {
		massage: "Change Password ",
        massageSlim: "Links"
	}
});

new Vue ({
	el: '#footer',
	data: {
		dev: "Anton M. Dudarev", 
		siteName: "http://anton.dudarev.com"
	}
});

new Vue({
    el: '#list',
    data: {  
        show: true,
        siteTitle: '',
        newSite: '',
        newSiteURL: '',
        sites: [],
        sitesDelete: []
    },
    computed:{
        filteredList: function(){
            var comp = this.siteTitle;            
            return this.sites.filter(function (elem) {
                if(comp==='') return true;
                else return elem.siteTitle.search(new RegExp(comp, "i")) > -1;
            })
        }
    },
    created: function () {
        var _this = this;
        $.getJSON('document.json', function (json) {
            _this.sites = json.sites;
        });
    },
    methods: {
        deleteSite: function (siteTitle) {
            var i = this.sites.length,
                    siteToRemove;
            while(i--) {
                if(this.sites[i].siteTitle == siteTitle) {
                    siteToRemove = this.sites[i];
                    break;
                }
            }
            this.sites.splice(i, 1);
            this.sitesDelete.unshift(
                {
                    siteTitle: siteToRemove.siteTitle,
                    company: siteToRemove.company,
                    siteIcon: siteToRemove.siteIcon
                }
            );
        }
    }
});

$( function() {
	$( "#sortable" ).sortable({
	   revert: true
	});
	$( "#draggable" ).draggable({
		connectToSortable: "#sortable",
		helper: "clone",
		revert: "invalid"
	});
	$( "ul, li" ).disableSelection();
});



