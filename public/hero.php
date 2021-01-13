<?php
/**
 * Template part for displaying home hero part
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Namier_Capital
 */

?>
<div class="hero">
	<div class="container">
		<div class="row">
			<div class="col-7 hero__col">
				<h1 class="hero__title">Connecting three worlds</h1>
				<p class="hero__desc">Strategic advisory with purpose</p>
			</div>
			<div class="col-5 hero__col">
				<div class="circles hero__icon">
					<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/circles.svg" class="circles__icon" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
					<a href="<?php echo esc_url( get_page_link( 12 ) ); ?>" class="circles__item">
						<p class="circles__item-name">Investors</p>
						<div class="circles__item-text">
							<p>enhancing your portfolio with disruptive tech companies</p>
						</div>
					</a>
					<a href="<?php echo esc_url( get_page_link( 14 ) ); ?>" class="circles__item">
						<p class="circles__item-name">Corporate</br>clients</p>
						<div class="circles__item-text">
							<p>providing M&A advice and enhancing your business with disruptive tech companies</p>
						</div>
					</a>
					<a href="<?php echo esc_url( get_page_link( 16 ) ); ?>" class="circles__item">
						<p class="circles__item-name">Growth</br>companies</p>
						<div class="circles__item-text">
							<p>scaling your business through corporate advice, strategic introductions and fundraising
							</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/home-mask.svg" class="wrapper__img" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">