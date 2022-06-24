from django.core.management.base import BaseCommand
from faker import Faker
from projects.models import Project


class Command(BaseCommand):
    help = "This command creates projects for our database"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for _ in range(3):
            title = fake.text(max_nb_chars=20)
            description = fake.paragraph(nb_sentences=3)

            Project.objects.create(title=title, description=description)
