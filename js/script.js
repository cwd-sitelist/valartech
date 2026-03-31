jQuery(document).on('ready', function() {
    (function($) {
        sideNavToggler();
    })(jQuery);
});


function sideNavToggler () {
	if ($('.side-navigation').length) {
		$('.side-nav-opener').on('click', function () {
			$('.side-navigation').addClass('open');
			return false;
		});
		$('.side-navigation-close-btn').on('click', function () {
			$('.side-navigation').removeClass('open');
			return false;
		});
	};
}
(function($) {
	
	"use strict";

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	handlePreloader();


	if ($('.square-menu').length) {
		$('.square-menu .floating-btn').on('click', function() {
			$('.square-menu').toggleClass('active');
		});
	}

	//Section Title Appear
	if ($('.sec-title').length){
		$('.sec-title').appear(function(){
			$(this).addClass('active').delay(1500);
		});
	}

	
	//Hidden Sidebar
	if ($('.sidenav-bar').length) {
		$('.sidenav-bar').mCustomScrollbar({
		    theme:"dark",
		});
	}


	// Banner Carousel / Owl Carousel 
	if ($('.banner-carousel').length) {
		$('.banner-carousel').owlCarousel({
			animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoHeight: true,
			autoplay: false,
			autoplayTimeout:5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				},
			}
		}); 
	}

	// Single Item Carousel 
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout:5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				},
			}
		}); 
	}

	// Services Carousel 
	if ($('.services-carousel').length) {
		$('.services-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout:5000,
			navText: [ '<span class="fa fa-long-arrow-alt-left"></span>', '<span class="fa fa-long-arrow-alt-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:3
				},
			}
		}); 
	}


    // Testimonial Carousel 
	if ($('.testimonial-carousel').length) {
		$('.testimonial-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout:5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					margin:0,
					items:1
				},
				768:{
					margin:0,
					items:2
				},
				1024:{
					margin:0,
					items:2
				}
			}
		}); 
	}

	// Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			smartSpeed: 500,
			autoplay: true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				600:{
					items:3
				},
				768:{
					items:4
				},
				1024:{
					items:5
				}
			}
		});    		
	}

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}


	//Progress Bar
	if($('.progress-line').length){
		$('.progress-line').appear(function(){
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width',percent+'%');
		},{accY: 0});
	}


	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',     
			animateClass: 'animated', 
			offset:       0,          
			mobile:       false,      
			live:         true      
		  }
		);
		wow.init();
	}

	function bg_parallax() {
		if ($('.page-wrapper').length) {
			$.stellar();
		}
	}
	
	// Initialize MixItUp Gallery
	if ($('.filter-list').length) {
		const $filterList = $('.filter-list');
	
		$filterList.mixItUp({
			callbacks: {
				onMixEnd: function () {
					bg_parallax(); // Reinitialize parallax
				},
				onMixStart: function (state, futureState) {
					const filter = futureState.activeFilter;
					$('.filter-tabs .filter').removeClass('active');
					$('.filter-tabs .filter[data-filter="' + filter + '"]').addClass('active');
				}
			}
		});
	}
	
	// On window load
	$(window).on('load', function () {
		handlePreloader();
	
		if ($('.mixitup-gallery').length > 0) {
			// Set the first filter as active
			const $firstFilter = $('.filter-tabs .filter').first();
			$firstFilter.addClass('active');
	
			// Trigger MixItUp to show first filter's group
			const filterValue = $firstFilter.data('filter');
			$('.filter-list').mixItUp('filter', filterValue);
	
			// Initialize parallax
			bg_parallax();
		}
	});
	
	

  
// document.addEventListener("DOMContentLoaded", function () {
// 	const listItems = document.querySelectorAll(".cat-list li"); // Select all navigation list items
// 	const tabContents = document.querySelectorAll(".tab-pane"); // Select all tab panes (content)
  
// 	// Function to Activate a Specific Tab
// 	function activateTab(tabId) {
// 	  // Remove 'active' class from all navigation items
// 	  listItems.forEach((menu) => menu.classList.remove("active"));
  
// 	  // Find and activate the corresponding navigation item
// 	  const currentTab = document.querySelector(`a[href="#${tabId}"]`);
// 	  if (currentTab) {
// 		currentTab.closest("li").classList.add("active");
// 	  }
  
// 	  // Remove 'show' and 'active' classes from all tab panes
// 	  tabContents.forEach((content) => content.classList.remove("show", "active"));
  
// 	  // Add 'show' and 'active' classes to the corresponding content pane
// 	  const targetContent = document.querySelector(`#${tabId}`);
// 	  if (targetContent) {
// 		targetContent.classList.add("show", "active");
  
// 		// Update `listItems` to reflect the active state
// 		listItems.forEach((item) => {
// 		  if (item.querySelector(`a[href="#${tabId}"]`)) {
// 			item.classList.add("active");
// 		  }
// 		});
// 	  }
// 	}
  
// 	// Handle Same-Page Clicks
// 	listItems.forEach((item) => {
// 	  item.addEventListener("click", function (e) {
// 		e.preventDefault(); // Prevent the default anchor behavior
  
// 		// Get the href attribute of the clicked link
// 		const targetId = this.querySelector("a").getAttribute("href").substring(1);
// 		activateTab(targetId); // Activate the clicked tab
// 	  });
// 	});
  
// 	// Handle URL Parameters or Hash for External Navigation
// 	const urlParams = new URLSearchParams(window.location.search);
// 	const activeTab = urlParams.get("tab") || window.location.hash.substring(1); // Get ?tab= or #hash value
  
// 	if (activeTab) {
// 	  activateTab(activeTab); // Activate the relevant tab based on the URL parameter or hash
// 	} else {
// 	  // Default to the first tab if no parameter or hash is provided
// 	  const firstTab = listItems[0];
// 	  if (firstTab) {
// 		const firstTabId = firstTab.querySelector("a").getAttribute("href").substring(1);
// 		activateTab(firstTabId);
// 	  }
// 	}
//   });
  
document.addEventListener("DOMContentLoaded", function () {
	const listItems = document.querySelectorAll(".cat-list li"); // Sidebar nav list items
	const tabContents = document.querySelectorAll(".tab-pane"); // All tab panes
  
	// Function to activate tab and show content
	function activateTab(tabId) {
	  // Remove 'active' from all sidebar items
	  listItems.forEach((item) => item.classList.remove("active"));
  
	  // Remove 'active show' from all tab panes
	  tabContents.forEach((pane) => pane.classList.remove("show", "active"));
  
	  // Activate correct tab pane
	  const targetPane = document.querySelector(`#${tabId}`);
	  if (targetPane) {
		targetPane.classList.add("show", "active");
	  }
  
	  // Activate matching sidebar link
	  const sidebarLink = document.querySelector(`.cat-list a[href="#${tabId}"]`);
	  if (sidebarLink) {
		sidebarLink.closest("li").classList.add("active");
	  }
	}
  
	// Handle any link with href="#..."
	const allTabLinks = document.querySelectorAll('a[href^="#"]');
  
	allTabLinks.forEach((link) => {
	  link.addEventListener("click", function (e) {
		const targetId = this.getAttribute("href").substring(1);
		if (document.querySelector(`#${targetId}`)) {
		  e.preventDefault();
		  activateTab(targetId);
  
		  // Optional scroll into view
		  const targetPane = document.querySelector(`#${targetId}`);
		  if (targetPane) {
			targetPane.scrollIntoView({ behavior: "smooth" });
		  }
		}
	  });
	});
  
	// Activate tab based on URL (either hash or ?tab=...)
	const urlParams = new URLSearchParams(window.location.search);
	const activeTab = urlParams.get("tab") || window.location.hash.substring(1);
  
	if (activeTab && document.getElementById(activeTab)) {
	  activateTab(activeTab);
	} else {
	  // Default to first tab
	  const firstTabId = listItems[0]?.querySelector("a")?.getAttribute("href")?.substring(1);
	  if (firstTabId) {
		activateTab(firstTabId);
	  }
	}
  });
  
  
})(window.jQuery);

